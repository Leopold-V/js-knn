const getData = async (jsonfilename) => {
  const response = await fetch(jsonfilename);
  const result = await response.json();
  const arrayFormat = result.map((ele) => {
    return Object.values(ele);
  });
  return arrayFormat;
};

const DistanceFromTargetArray = async (target, dataset) => {
  const copyBeforeModif = JSON.parse(JSON.stringify(dataset));
  const long = Math.sqrt(target.reduce((a, b) => a + b * b, 0));

  const newArr = dataset.map((ele) => {
    ele.pop();
    return Math.sqrt(ele.reduce((a, b) => a + b * b, 0));
  });
  const tab = newArr.map((ele, i) => {
    return [ele, copyBeforeModif[i][copyBeforeModif[i].length - 1]];
  });
  const final = tab.map((ele) => {
    return [Math.abs(ele[0] - long), ele[ele.length - 1]];
  });
  final.sort((a, b) => a[0] - b[0]);
  return final;
};

const FindSpecies = async (arr) => {
  const count = {};

  console.log(arr);
  for (let i = 0; i < 8; i++) {
    if (count[arr[i][arr[i].length - 1]] !== undefined) {
      count[arr[i][arr[i].length - 1]]++;
    } else {
      count[arr[i][arr[i].length - 1]] = 1;
    }
  }
  return count;
};

const predict = async (target, jsonfile) => {
  const arr = await getData(jsonfile);
  const final = await DistanceFromTargetArray(target, arr);
  const result = await FindSpecies(final);
  console.log(result);
  return result;
};

//Example with iris demo dataset

const jsonfile1 = "iris.json";
const target1 = [5.1, 3.5, 1.4, 0.2];
const target2 = [7.7, 3, 6.1, 2.3];
const target3 = [5, 2.3, 3.3, 1];

predict(target1, jsonfile1);
predict(target2, jsonfile1);
predict(target3, jsonfile1);

const jsonfile2 = "newDiabetes.json";
const target4 = [50, 0, 33.6, 0.627, 148, 6, 72, 35];
const target5 = [31, 0, 26.6, 0.351, 85, 1, 66, 29];
predict(target4, jsonfile2);
predict(target5, jsonfile2);

/*
Result :
target 1 : { setosa: 8 }
target 2 : { virginica: 8 }
target 3 : { versicolor: 4, setosa: 4 }
*/
