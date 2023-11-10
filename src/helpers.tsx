export const createLabel = (data: String) => {
  const normalizeData = data.slice(data.indexOf(" ")).trim();
  const firstLetter = normalizeData.slice(0, 1).toUpperCase();
  const remainingPart = normalizeData.slice(1);

  return firstLetter + remainingPart;
};

export const parseMonth = (monthNum: number): string => {
  switch (monthNum) {
    case 0: {
      return "января";
    }
    case 1: {
      return "февраля";
    }
    case 2: {
      return "марта";
    }
    case 3: {
      return "апреля";
    }
    case 4: {
      return "мая";
    }
    case 5: {
      return "июня";
    }
    case 6: {
      return "июля";
    }
    case 7: {
      return "августа";
    }
    case 8: {
      return "сентября";
    }
    case 9: {
      return "октября";
    }
    case 10: {
      return "ноября";
    }
    case 11: {
      return "декабря";
    }
    default:
      return "";
  }
};

export const parseData = (value: number): string => {
  const stringValue = value.toString();
  let result: string;

  if (stringValue.length === 1) {
    result = `0${stringValue}`;
  } else {
    result = stringValue;
  }

  return result;
};

export const validateEmail = (email: string) => {
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  return emailRegex.test(email);
};

export const sellsFromData = (date: string): string => {
  const month = date?.slice(date?.lastIndexOf("-") + 1);
  const year = date?.slice(0, date?.indexOf("-"));

  return `${parseMonth(Number(month) - 1)} ${year}`;
};

export const setNewImages = (data: any) => {
  const newImages: any = [];
  for (let i = 0; i < 5; i++) {
    if (data?.[i]?.url) {
      newImages.push({ src: `http://localhost:8090/${data[i]?.url}` });
    } else {
      newImages.push({});
    }
  }
  return newImages;
};
