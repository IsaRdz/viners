const devs = [
    {
        name: "Andres Trostdorf",
        nickname: "Andy",
        dev_github: "https://github.com/TrostdorfA",
        dev_linkedin: ""
    },  
    {
        name: "Cristian Mansilla",
        nickname: "Cris",
        dev_github: "https://github.com/CristianMansilla",
        dev_linkedin: ""
    },
    {
        name: "Juan Boujon",
        nickname: "Juan",
        dev_github: "https://github.com/Juan2805",
        dev_linkedin: ""
    },
    {
        name: "Isabel Rodríguez",
        nickname: "Isa",
        dev_github: "https://github.com/IsaRdz",
        dev_linkedin: ""
    }
]

const footerContainer = document.getElementById('footer-container');

function renderFooter(){
    let body = ``;
    devs.map( (dev) => {
        
        body += `
        <div class="footer-dev">
            <a href=" ${dev.dev_github} " target="_blank"><img src="https://img.icons8.com/glyph-neue/64/FFFFFF/github.png"/></a>
            <a href=" ${dev.dev_linkedin} "><img src="https://img.icons8.com/glyph-neue/64/FFFFFF/linkedin-circled.png"/></a>
            <span> ${dev.nickname} </span>
        </div>
        `
    })
    footerContainer.innerHTML = body;
}

renderFooter();