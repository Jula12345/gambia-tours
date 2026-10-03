(function () {
  const stage = document.querySelector("[data-video-stage]");
  const video = document.querySelector("[data-property-video]");
  const play = document.querySelector("[data-play-video]");
  const feedback = document.querySelector("[data-video-feedback]");

  if (play && video && stage) {
    play.addEventListener("click", async () => {
      video.src = video.dataset.videoSrc;
      video.hidden = false;
      play.hidden = true;
      stage.querySelector("img").hidden = true;
      try {
        await video.play();
      } catch {
        feedback.textContent = "Press play in the video controls to start the tour.";
      }
    });
    video.addEventListener("error", () => {
      feedback.textContent = "The video could not be loaded. Please try again or contact us for the property tour.";
    });
  }

  const checkIn = document.querySelector("[data-check-in]");
  const checkOut = document.querySelector("[data-check-out]");
  if (!checkIn || !checkOut) return;

  function dateValue(date) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  }

  checkIn.min = dateValue(new Date());
  function updateCheckOut() {
    if (!checkIn.value) return;
    const nextDay = new Date(checkIn.value + "T12:00:00");
    nextDay.setDate(nextDay.getDate() + 1);
    checkOut.min = dateValue(nextDay);
    if (checkOut.value && checkOut.value <= checkIn.value) checkOut.value = "";
  }
  checkIn.addEventListener("change", updateCheckOut);
})();
