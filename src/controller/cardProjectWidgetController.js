let a = document.getElementById("cardWidgetSelector")
let b = document.getElementById("cardWitgetDisplay")
let cards = [].slice.call(a.children);
cards.forEach(element => {
    element.children[0].addEventListener("click", function(){
        loadProjectData(element.children[0].dataset.projectTitle)
    });
});

async function loadProjectData(projectTitle) {
    if(projectTitle==null|projectTitle==""){return;}
    fetch("/Portfolio/assets/HtmlData/"+localStorage.language.substring(0, 2)+"/projectData/"+projectTitle+"Data")
    .then( (result) => result.text() )
    .then( (text) => {
        let dataParts = text.split("<ArticleSeparator/>");
        for(let index=0; index<dataParts.length; index++){
            b.children[index].innerHTML=dataParts[index];
        }
    })
    .catch( (error) => console.error(error) );
}