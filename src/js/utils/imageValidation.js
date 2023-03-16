export default function imageValidation(data) {
  if (!data.multimedia || data.multimedia.length === 0 || data.multimedia.length === 2) {
    return 'https://cdn.pixabay.com/photo/2019/04/29/16/11/new-4166472_960_720.png';
  } else if (data.multimedia.length > 0) {
    return `${data.multimedia[2].url}`;
  }
}
