/* Put your javascript in here */

/* label the images, just for convenience, to visually track them */
let i = 1;
for (let li of carousel.querySelectorAll('li')) {
    li.style.position = 'relative';
    li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
    i++;
}

/* configuration */
let width = 130; // image width
let count = 3; // visible images count

let list = carousel.querySelector('ul');
let listElems = carousel.querySelectorAll('li');

let position = 0; // ribbon scroll position

carousel.querySelector('.prev').onclick = function() {
    // shift left
    position += width * count;
    // can't move to the left too much, end of images
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = () => {
    // shift right
    position -= width * count;
    // can only shift the ribbbon for (total ribbon length - visible count) images
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
};

/* function arrayMethodDemo() {
  const array1 = [1, 2, "3", 4, 5];
  
	const listContainer = document.createElement('ul');
	const target = document.querySelector('#box1');
  target.append(listContainer);
  
	const array2 = array1.map(element => {
    const listItem = document.createElement('li');
    listItem.innerText = element;
    listContainer.append(listItem);
    return typeof element;
  })
  
  
  console.log(array2);
}

function onLoadOfPage() {
	document.addEventListener('click', (event) => {
	  arrayMethodDemo()
  })
}

window.onload = onLoadOfPage; */