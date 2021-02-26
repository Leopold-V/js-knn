const getdata = async () => {
  const response = await fetch("iris.json");
  const res = await response.json();
  return res;
};

const DistanceFromTargetArray = async (
  sepal_length,
  sepal_width,
  petal_length,
  petal_width
) => {
  const arr = await getdata();
  const copyBeforeModif = JSON.parse(JSON.stringify(arr));
  const long = Math.sqrt(
    sepal_length * sepal_length +
      sepal_width * sepal_width +
      petal_length * petal_length +
      petal_width * petal_width
  );

  const newArr = arr.map((ele) => {
    delete ele["species"];
    return Math.sqrt(Object.values(ele).reduce((a, b) => a + b * b, 0));
  });
  const tab = newArr.map((ele, i) => {
    return { value: ele, species: copyBeforeModif[i]["species"] };
  });
  const final = tab.map((ele) => {
    return { position: Math.abs(ele.value - long), species: ele.species };
  });
  final.sort((a, b) => a.position - b.position);

  return final;
};

const FindSpecies = async (
  sepal_length,
  sepal_width,
  petal_length,
  petal_width
) => {
  const arr = await DistanceFromTargetArray(
    sepal_length,
    sepal_width,
    petal_length,
    petal_width
  );
  const count = {};

  for (let i = 0; i < 8; i++) {
    if (count[arr[i].species] !== undefined) {
      count[arr[i].species]++;
    } else {
      count[arr[i].species] = 1;
    }
  }
  console.log(count);

  return count;
};

FindSpecies(5.1, 3.5, 1.4, 0.2);
