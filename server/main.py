# server/main.py
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# ────────────────────────────────────────────────────────────────
# Caminho até a pasta dist/ gerada pelo Vite
# (ajuste se você moveu o build para outro lugar)
# ────────────────────────────────────────────────────────────────
DIST_DIR = Path(__file__).parent / "dist"

# ----------------------------------------------------------------
# 1) Redireciona /inicio → URL externa
# ----------------------------------------------------------------
# • status_code=307 mantém método e corpo da requisição (útil p/ POST);
#   troque para 302 se preferir um redirecionamento “comum” de GET.
#from fastapi import FastAPI, Request
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse

app = FastAPI()

REDIRECT_URL = "https://loginredirect-251677608789.southamerica-east1.run.app"

@app.get("/inicio", include_in_schema=False)
@app.get("/inicio/", include_in_schema=False)
async def redirect_inicio(request: Request):
    """
    Repassa qualquer query recebida em /inicio para a URL externa.

    Ex.:
      GET /inicio?name=foo&email=bar
      → 302/307 Location: https://loginredirect-…app?name=foo&email=bar
    """
    # Query original ('' se não houver)
    original_query = request.url.query

    # Se já houver "?" no REDIRECT_URL, usamos "&" como separador
    sep = "&" if "?" in REDIRECT_URL else "?"
    target = (
        f"{REDIRECT_URL}{sep}{original_query}"
        if original_query
        else REDIRECT_URL
    )

    # 307 preserva método/corpo; use 302 se quiser “forçar” GET
    return RedirectResponse(url=target, status_code=307)

# ----------------------------------------------------------------
# 2) Página inicial da SPA em "/"
# ----------------------------------------------------------------
@app.get("/", include_in_schema=False)
async def index():
    return FileResponse(DIST_DIR / "index.html")

# ----------------------------------------------------------------
# 3) Arquivos estáticos gerados pelo Vite (JS, CSS, imagens…)
# ----------------------------------------------------------------
# Vite coloca tudo em dist/assets por padrão.
app.mount(
    "/assets",
    StaticFiles(directory=DIST_DIR / "assets"),
    name="assets",
)

# ----------------------------------------------------------------
# 4) Catch-all: se o arquivo existir entregamos; senão, volta index.html
#    ⇒ Suporta React Router (rotas client-side) e outros paths do front
# ----------------------------------------------------------------
@app.get("/{full_path:path}", include_in_schema=False)
async def spa_router(full_path: str):
    file_path = DIST_DIR / full_path
    if file_path.is_file():
        return FileResponse(file_path)
    return FileResponse(DIST_DIR / "index.html")