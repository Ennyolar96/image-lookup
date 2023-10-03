function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomImage = async (Access) => {
  var generatedArray = Array.from({ length: 1000 }, (_, index) => index + 1);
  const num = generatedArray[randomNum(0, 1000)];
  try {
    const request = await fetch(
      `https://api.unsplash.com/photos?page=${num}&client_id=${Access}&per_page=30`
    );
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default randomImage;
