function numberWithoutCommas(x: string) {
  return parseInt(x.replace(/(\,|\.)/g, ""), 10);
}

export default { numberWithoutCommas } as const;
