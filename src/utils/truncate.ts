export function truncateText(text: string, length: number) {
    const maxLength = length;
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength - 3) + "...";
    } else {
      return text?.padEnd(maxLength, " "); 
    }
  }