function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  console.log('window loaded');
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const form = document.querySelector('.userForm');
  const search = document.querySelector('.search');
  const target = document.querySelector('.target-ul');

  const request = await fetch(endpoint);
  const data = await request.json();
  console.log(data);

  search.addEventListener('input', (event) => {
    console.log('input', event.target.value); // logs the input so its easier to follow
    target.innerHTML = ""; 
    // this actually does the filtering. So right now it is just set to name
    // we could add more filters if we wanted to like category
    const filtered = data.filter((record => record.name.toUpperCase().includes(search.value.toUpperCase())));
    // for each filtered result, creates a new li containing the name, category and address
    filtered.forEach((item) => {
        const elem = document.createElement('li');
        elem.classList.add('list-item');
        elem.innerText = item.name + "\n" + item.category + "\n" + item.address_line_1;
        // appends the li into the ul
        target.append(elem);
    })
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;