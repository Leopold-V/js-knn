const getdata = async (jsonfilename) => {
  const response = await fetch(jsonfilename);
  const res = await response.json();
  return res;
};

const DistanceFromTargetArray = async (target, jsonfilename) => {
  const arr = await getdata(jsonfilename);
  const copyBeforeModif = JSON.parse(JSON.stringify(arr));
  const long = Math.sqrt(
    target.reduce((a,b) => a+(b*b), 0)
  );

  const newArr = arr.map((ele, i) => {
    delete arr[i][Object.keys(arr[i])[Object.keys(arr[i]).length-1]];
    return Math.sqrt(Object.values(ele).reduce((a, b) => a + (b * b), 0));
  });
  const tab = newArr.map((ele, i) => {
    return { value: ele, species: Object.values(copyBeforeModif[i])[Object.values(copyBeforeModif[i]).length-1] };
  });
  const final = tab.map((ele) => {
    return { position: Math.abs(ele.value - long), species: ele.species };
  });
  final.sort((a, b) => a.position - b.position);
  return final;
};

const FindSpecies = async (target, jsonfilename) => {
  const arr = await DistanceFromTargetArray(target, jsonfilename);
  const count = {};

  for (let i = 0; i < 8; i++) {
    if (count[arr[i][Object.keys(arr[i])[Object.keys(arr[i]).length-1]]] !== undefined) {
      count[arr[i][Object.keys(arr[i])[Object.keys(arr[i]).length-1]]]++;
    } else {
      count[arr[i][Object.keys(arr[i])[Object.keys(arr[i]).length-1]]] = 1;
    }
  }
  console.log(count);
  return count;
};

//Example with iris demo dataset

const jsonfile = 'iris.json';
const target = [5.1, 3.5, 1.4, 0.2]
const target2 = [7.7,3,6.1,2.3];
const target3 = [5, 2.3, 3.3, 1];
FindSpecies(target, jsonfile);
FindSpecies(target2, jsonfile);
FindSpecies(target3, jsonfile);

/*
Result :
target 1 : { setosa: 8 }
target 2 : { virginica: 8 }
target 3 : { versicolor: 4, setosa: 4 }
*/