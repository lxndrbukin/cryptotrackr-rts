export const formatData = (data: Array<Array<number>>) => {
  const finalData = {
    labels: [] as Array<string>,
    datasets: [
      {
        label: "Price",
        data: [] as Array<number>,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 0.8)",
        fill: true,
      },
    ],
  };

  const dates = data.map((val: Array<number>): string => {
    const ts = val[0];
    const date = new Date(ts * 1000);
    const day = date.getDate();
    const dd = day < 10 ? `0${day}` : day;
    const month = date.getMonth() + 1;
    const mm = month < 10 ? `0${month}` : month;
    const yyyy = date.getFullYear();
    const final = `${dd}/${mm}/${yyyy}`;
    return final;
  });

  const priceArr = data.map((val: Array<number>): number => {
    return val[4];
  });

  priceArr.reverse();
  dates.reverse();
  finalData.labels = dates;
  finalData.datasets[0].data = priceArr;

  return finalData;
};
