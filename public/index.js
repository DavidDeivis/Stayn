const container = document.querySelector(".game");
const resolucion = document.querySelector(".resolucion");
const button = document.getElementById("play");
var desitionB = false;



// let headers = {
// 	method: "GET",
// 	body: `{"nombre": "david", "apellido": "doble"}`,
// 	headers: {"Content-type": "application/json"}
// }

// fetch('http://localhost:7040/info')
  // .then(response => response.json())
  // .then(data => console.log(data));


// fetch('http://localhost:7040/video',{
// 	method: "POST",
// 	headers: {
//     'Content-Type': 'application/json' //;charset=utf-8
//     },
// 	body: JSON.stringify(user)
// }).then(response => response.json())
//   .then(data => console.log(data));


	// const peti = await fetch('http://localhost:7535/data/local',{
	// 	method: "POST",
	// 	headers: {
	// 	'Content-Type': 'application/json'
	// 	   },
	// 	body: JSON.stringify({opcion: camino})
	// });

	// const peti2 = await peti.json();
	// console.log(peti2);

	// apiObservar.observe(resolucion);


let publicacion = 0;
let cargado = 0;



const decidido = async camino =>{


	if(camino == 0){

	fetch('http://localhost:7535/data/local',{
		method: "POST",
		headers: {
		'Content-Type': 'application/json'
		   },
		body: JSON.stringify({opcion: camino})
	}).then(response => response.text())
  	  .then(res => look(true));

	}

	if(camino == 1){

	fetch('http://localhost:7535/data/local',{
		method: "POST",
		headers: {
		'Content-Type': 'application/json'
		   },
		body: JSON.stringify({opcion: camino})
	}).then(response => response.text())
  	  .then(res => look(true));

	}

	if(camino == 2){

	fetch('http://localhost:7535/data/local',{
		method: "POST",
		headers: {
		'Content-Type': 'application/json'
		   },
		body: JSON.stringify({opcion: camino})
	});

	}

	look();

}


const observar = async entry =>{

	// console.log(entry.length);

	// console.log(entry[0])

	// console.log(entry[entry.length - 1]);

	if((entry[entry.length - 1].isIntersecting) && desitionB == false){


		// console.log("envio")

		let peticion = await fetch("http://localhost:7535/data");
		let res = await peticion.json();

		let res2 = JSON.parse(res);

		// console.log(res2);

		if(res2.model == "p"){
			fetch("http://localhost:7535/data/local");
			look();
			return;
		}


		if(res2.model == "m"){
			var nodo = document.createElement("DIV");
			nodo.classList.add("chat");
			nodo.innerHTML = res2.element;
		}
		else if(res2.model == "v"){
			var nodo = document.createElement("VIDEO");
			// nodo.classList.add("clips");
			nodo.src = res2.src;
			nodo.setAttribute("controls", "");
		}
		else if(res2.model == "i"){
			var nodo = document.createElement("IMG");
			nodo.src = res2.src;
		}
		else if(res2.model == "s"){
			var nodo = document.createElement("AUDIO");
			nodo.src = res2.src;
			nodo.setAttribute("autoplay", "");

			setTimeout(()=>{

				nodo.pause();

			 	look();

			}, res2.stop);
		}
		else if(res2.model == "d"){
			desitionB = true;
			var nodo = document.createElement("div");
			nodo.classList.add("container-desition");
			let variante = res2.element.split("|");

			let u = document.createDocumentFragment();

			for (let i = 0; i < variante.length; i++) {

				let desition = document.createElement("BUTTON");
				desition.classList.add("desition", `${i + 1}`);
				desition.textContent = variante[i];

				desition.addEventListener("click", ()=>{
					decidido(i);
				});

				u.appendChild(desition);
				
			}

			nodo.appendChild(u);
		}


		setTimeout(()=>{

			container.appendChild(nodo);

			setTimeout(()=>{
				nodo.style.opacity = 1;
			}, 100)
			
			if(res2.model != "d" && res2.model != "s"){

				// console.log(nodo);
				apiObservar.observe(nodo);
			}

		}, res2.time);

		// fetch('http://localhost:7040/info')
		 // .then(response => response.json())	
		 // .then(data => console.log(data));
		
	}
}

let apiObservar = new IntersectionObserver(observar);


function look(d){
	if(d){
		desitionB = false;
	}
	apiObservar = new IntersectionObserver(observar);
	apiObservar.observe(document.body);
}


function PLAY(){

	// let comenzar = fetch("http://localhost:7535/play");
	fetch("http://localhost:7535/play")
	apiObservar.observe(document.body);

}

button.addEventListener("click", ()=>{

	document.getElementById("listCapitulo").style.display = "none";
	PLAY();
	
	// button.style.display = "none";
});
