const devs = [
    {
        name: "Andres Trostdorf",
        nickname: "Andy",
        dev_github: "https://github.com/TrostdorfA",
        dev_linkedin: "https://www.linkedin.com/in/astrostdorf/"
    },  
    {
        name: "Cristian Mansilla",
        nickname: "Cris",
        dev_github: "https://github.com/CristianMansilla",
        dev_linkedin: "https://www.linkedin.com/in/cristian-ezequiel-mansilla/"
    },
    {
        name: "Juan Boujon",
        nickname: "Juan",
        dev_github: "https://github.com/Juan2805",
        dev_linkedin: "https://www.linkedin.com/in/juan-boujon/"
    },
    {
        name: "Isabel Rodríguez",
        nickname: "Isa",
        dev_github: "https://github.com/IsaRdz",
        dev_linkedin: "https://www.linkedin.com/in/isabelrod/"
    }
]

const footerContainer = document.getElementById("footer-container")

function renderFooter() {
  let body = ``
  devs.map((dev) => {
    body += `
        <div class="footer-dev">
            <a href=" ${dev.dev_github} " target="_blank"><img src="https://img.icons8.com/glyph-neue/64/FFFFFF/github.png"/></a>
            <a href=" ${dev.dev_linkedin} " target="_blank"><img src="https://img.icons8.com/glyph-neue/64/FFFFFF/linkedin-circled.png"/></a>
            <span> ${dev.name} </span>
        </div>
        `
  })
  footerContainer.innerHTML = body
}

renderFooter()
