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
/**
		 *  1. state dispatch(setPlayerIsReady(!playerIsReady));
		 *  2. socket.emit("playerGettingReady", {players})
		 * 	3. socket.on("playerReadyStatusUpdate", (data) => {
		 * 			data besteht aus:
		 * 				{
		 * 					socketId,
		 * 					readyStatus,
		 * 				}
		 * 				
		 * 			if(socketId === data.playerId) {
		 * 				dispatch(setPlayers())
		 * 			}
		 *		 })
		 */		 



