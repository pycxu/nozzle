const DataFormater = (number) => {
    if(number > 1000000000){
      return (number/1000000000).toFixed(3).toString() + 'G';
    }else if(number > 1000000){
      return (number/1000000).toFixed(3).toString() + 'M';
    }else if(number > 1000){
      return (number/1000).toFixed(3).toString() + 'K';
    }else{
      return number.toString();
    }
}

export default DataFormater;