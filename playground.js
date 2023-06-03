let categories = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const selectedCategories = categories.map((e, i) => {
	let select;
	if (i % 2 === 0) {
		select = true;
	} else {
		select = false;
	}
	return {
		categoryName: e,
		selected: select,
	};
});

const lockedCategories = selectedCategories.filter((e) => {
	if (e.selected) {
		return e;
	}
});

console.log(lockedCategories);
