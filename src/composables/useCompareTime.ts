import { PhotoSpot } from "@/models/photoSpot.model";
import { ref } from "vue";

export interface DayTime {
  hour: number;
  minutes: number;
  seconds: number;
}

const startMorning: DayTime = { hour: 7, minutes: 0, seconds: 0 };
const endMorning: DayTime = { hour: 13, minutes: 0, seconds: 0 };

const startEvening: DayTime = { hour: 17, minutes: 0, seconds: 0 };
const endEvening: DayTime = { hour: 21, minutes: 10, seconds: 59 };

const startDusk: DayTime = { hour: 21, minutes: 11, seconds: 0 };
const endDusk: DayTime = { hour: 23, minutes: 59, seconds: 59 };

const startNight: DayTime = { hour: 0, minutes: 0, seconds: 0 };
const endNight: DayTime = { hour: 6, minutes: 59, seconds: 0 };

function getPhotosFromInterval(
  photos: PhotoSpot[],
  start: DayTime,
  end: DayTime
) {
  return photos.filter((photo) => {
    const now = photo.exif?.DateTimeOriginal?.toDate();

    const startTime = photo.exif?.DateTimeOriginal?.toDate();
    const endTime = photo.exif?.DateTimeOriginal?.toDate();

    startTime?.setHours(start.hour, start.minutes, start.seconds);
    endTime?.setHours(end.hour, end.minutes, end.seconds);

    if (now && startTime && endTime) {
      if (now >= startTime && now < endTime) {
        return photo;
      }
    }
  });
}

export function useCompareTime() {
  const filteredPhotos = ref<PhotoSpot[]>([]);

  function getPhotosByDayTime(photos: PhotoSpot[], dayTime: string): void {
    switch (dayTime) {
      case "all":
        filteredPhotos.value = photos;
        break;

      case "morning":
        filteredPhotos.value = getPhotosFromInterval(
          photos,
          startMorning,
          endMorning
        );
        break;

      case "evening":
        filteredPhotos.value = getPhotosFromInterval(
          photos,
          startEvening,
          endEvening
        );
        break;

      case "night":
        const nigthFirstPart = getPhotosFromInterval(
          photos,
          startDusk,
          endDusk
        );
        const nigthLastPart = getPhotosFromInterval(
          photos,
          startNight,
          endNight
        );
        filteredPhotos.value = [...nigthFirstPart, ...nigthLastPart];
        break;

      default:
        filteredPhotos.value = [];
        break;
    }
  }

  return {
    filteredPhotos,
    getPhotosByDayTime,
  };
}
