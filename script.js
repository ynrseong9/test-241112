// script.js
let apiKey = "";

document
  .getElementById("api-key-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    apiKey = document.getElementById("api-key").value;
    document.getElementById("image-form").style.display = "block"; // 이미지 생성 폼을 보이게 함
    document.getElementById("api-key-form").style.display = "none"; // API 키 폼 숨김
  });

document
  .getElementById("image-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const keyword = formData.get("keyword");
    const resultDiv = document.getElementById("result");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: keyword,
            n: 1,
            size: "1024x1024",
            model: "dall-e-3",
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        resultDiv.innerHTML = `<p class="error">오류: ${data.error.message}</p>`;
      } else {
        const imageUrl = data.data[0].url;
        resultDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
      }
    } catch (error) {
      resultDiv.innerHTML = `<p class="error">오류가 발생했습니다: ${error.message}</p>`;
    }
  });
