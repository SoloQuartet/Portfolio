let a = document.getElementById("cardWidgetSelector")
let b = document.getElementById("cardWitgetDisplay")
let cards = [].slice.call(a.children);

b.addEventListener("click", function(){
    b.style.display = 'none';
})

cards.forEach(element => {
    element.children[0].addEventListener("click", function(){
        let path = element.children[0].src.split('/');
        enhanceImage(path[path.length-1]);
    });
});

async function enhanceImage(imageName) {
    if(imageName==null|imageName==""){return;}
    b.children[0].src = '/assets/images/'+ imageName.split('Card.png')[0] +'HD.png';
    fetch("/assets/HtmlData/"+localStorage.language.substring(0, 2)+"/drawingData/"+imageName.split('Card.png')[0]+"Data")
    .then( (result) => result.text() )
    .then( (text) => {
        b.children[1].innerHTML = text;
    })
    .catch( (error) => b.children[1].innerHTML = '' );
    
    b.style.display = 'flex';
}