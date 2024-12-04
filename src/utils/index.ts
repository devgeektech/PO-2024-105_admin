export const getAge = (dateString: any) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 0) return 0;
    return age;
}


export const getFormData = (object: any) => {
    const formData = new FormData();
  
    if (Array.isArray(object)) {
      object.forEach((item, index) => {
        Object.keys(item).forEach((key) => {
          formData.append(`array[${index}][${key}]`, item[key]);
        });
      });
    } else {
      Object.keys(object).forEach((key) => {
        formData.append(key, object[key]);
      });
    }
  
    return formData;
}; 