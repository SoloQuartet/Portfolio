if(localStorage.getItem("language")===null){
    localStorage.setItem("language", "French");
}

addEventListener("DOMContentLoaded", (event) => {
    loadPageData();

    // Keep the navbar collapsed if it already is
    if(sessionStorage.getItem("navbarStatus")!==null
        && sessionStorage.getItem("navbarStatus") == "collapsed"){
            document.getElementById("header").classList.add("collapsed");
        }

        // Language select

    let languageSelector = document.getElementById("languageSelect");

    if(localStorage.getItem("language")!='French'){languageSelector.value=localStorage.getItem("language")}

    languageSelector.addEventListener("change", function() {
        let previousLanguage = localStorage.getItem("language");
        localStorage.setItem("language", languageSelector.value);
        if(previousLanguage!=localStorage.getItem("language")){
            window.location.reload();
        }
    })

    
})

// Navbar Collapse
function toggleNav(){
    header = document.getElementById("header");
    if( !header.classList.contains("collapsed") ){
        header.classList.add("collapsed");
        sessionStorage.setItem("navbarStatus", "collapsed")
    } else {
        header.classList.remove("collapsed");
        sessionStorage.removeItem("navbarStatus")
    }
}

async function loadPageData() {

    let toBeLoaded = document.getElementsByClassName("loadableContent");
    let dataEmplacments = [].slice.call(toBeLoaded);
    if(dataEmplacments.length<1){return;}
    dataEmplacments.forEach(element => {
        fetch("/assets/HtmlData/"+localStorage.language.substring(0, 2)+"/"+element.dataset.contentName+"Data")
        .then( (result) => result.text() )
        .then( (text) => {
            element.innerHTML = text;
        })
        .catch( (error) => console.error(error) );
    });
}