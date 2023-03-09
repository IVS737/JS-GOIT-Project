// newsList.addEventListener('click', onLinkClick);
// const LOCAL_STORAGE_KEY = 'read_key';
// function onLinkClick(event) {
//   if (event.target.dataset.action === 'link') {
//     const element = event.target.parentElement.parentElement.parentElement.dataset.id;
//     console.log(event.target.parentElement.parentElement.parentElement);

//     setItemToLocalStorage(element);
//   }
// }

// //Перевірка наявності даних в локалсторидж и запис нових даних
// function setItemToLocalStorage(item) {
//   const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
//   //Конвертація формату дати 00/00/00
//   const currentData = new Date();
//   const currentDataString = `${currentData.getDate()}/${currentData.getMonth() + 1}/${currentData.getFullYear()}`; // *******

//   if (!dataLocalStorage) {
//     const newData = [{ data: currentDataString, items: [item] }];
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
//     return;
//   }

//   const dataArr = JSON.parse(dataLocalStorage);

//   let goodDataFlag = true; //прапорець перевірки запису в локалсторидж

//   const newDataArr = dataArr.map((elItem) => {
//     if (elItem.data === currentDataString) {
//       goodDataFlag = false;
//       elItem.items.push(item);
//       return elItem;
//     }
//     return elItem;
//   });

//   if (goodDataFlag) {
//     newDataArr.push({ data: currentDataString, items: [item] });
//   }

//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDataArr));
// }
