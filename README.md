# Gerador de Conteúdo


O fronte-end do código é escrito em escrito em react e foi criado parcialmente criado com a ferramenta Lovable e posteriormente editado. O backend é escrito em python e usa Fast API.

A ferramenta tem como intuito facilitar as criações textuais do marketing a partir de especificações que são inseridas nessa ferramenta.

Após completar a inserção de dados a ferramenta faz uma requisição para o endpoint que coletada e processa os dados. 

A requisição em json tem o seguinte formato:

```
json = {
   "name": "Nome"
    "email": "E-mail",
    "theme": "Tema",
    "persona": "Persona",
    "tone": "Tom de Fala",
    "instruction": "Instruções",
    "cta": "CTA",
    "restrictions": "Restrições",
    "link": "Link Task no Asana",
    "channels": {[
        "email": {
            "quantity": 1
        },
        "articles": {
            "quantity": 1
        },
        "paid_media": {
            "google_ads": {
                "quantity": 1,
                "format": ""
            },
            "linkedin_ads": {
                "quantity": 1,
                "format": ""
            },
            "meta_ads": {
                "quantity": 1,
                "format": ""
            }
        }
    ]}
}

```
