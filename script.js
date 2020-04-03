if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
    afterLoaded();
}

function afterLoaded(){
    let e = document.getElementById("key-scale");
    console.log(e.value);
};


