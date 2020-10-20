const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" };

const vowels = "AEIUYO";
const symbolEmpty = "X";

const getLetter = (txt) => txt.toUpperCase();

const formatDay = (day) => day < 10 ? `0${day}` : day;

function parseString(txt) {
	let txtVowels = "";
	let txtCons = "";
	
	for (let letter of txt.split('')) {
		letter = getLetter(letter);

		vowels.includes(letter)
			? txtVowels += letter
			: txtCons += letter;

		if (txtCons.length > 2) break;
	}
	
	while(txtCons.length < 3) {
		if (txtVowels.length > 0) {
			txtCons += txtVowels[0];
			txtVowels = txtVowels.slice(1);
		} else {
			txtCons += symbolEmpty;
		}
	}
	
	return txtCons;
}

const parseDate = (date, mode = false) => {
  let [day, month, year] = date.split('/');
  
  if (mode) day = Number(day) + 40;

  return year.slice(2)
    + months[month]
    + formatDay(day);
}

function fiscalCode(person) {
	return parseString(person.surname)
		+ parseString(person.name)
		+ parseDate(person.dob, person.gender === "F");
}

function getPerson(person) {
	return {
  	name: `${person.name} ${person.surname}`,
    code: fiscalCode(person),
  };
}

const Brendan = getPerson({ name: "Brendan", surname: "Eich", gender: "F", dob: "5/12/1961" });
const Alex = getPerson({ name: "Tidjfk", surname: "Ojdrf", gender: "M", dob: "5/12/1893" });
const Artur = getPerson({ name: "Oyt", surname: "Trust", gender: "M", dob: "5/12/1998" });

function getHTML(name, code) {
	return `
  	<div class="tag">
    	<span>${name}</span>
			<span>${code}</span>
   	</div>
  `;
}

function createContainer() {
	return Object.values(arguments).reduce(
    (html, item) => {
    	html += getHTML(item.name, item.code);
	
      return html;
    },
    '<div class="container">'
  ) + '</div>';
};

document.getElementById("app").innerHTML = createContainer(Brendan, Alex, Artur);
