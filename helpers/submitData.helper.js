//Reformat the incoming data to have a format as [{input:"Question",val:"Data"}]
export const submitData = (list) => {
  var l = [];
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    var innerl = [];
    for (let index = 0; index < element.length; index++) {
      const innerelement = element[index];
      if (innerelement.type == "text" || innerelement.type == "radio") {
        innerl.push({
          input: innerelement.input,
          val: innerelement.val,
          id: innerelement._id,
          type: innerelement.type,
          subheadings: innerelement.subheadings,
        });
      } else {
        var li = [];
        for (let ind = 0; ind < JSON.parse(innerelement.val).length; ind++) {
          const e = JSON.parse(innerelement.val)[ind];
          if (e == true) {
            li.push(innerelement.subheadings[ind]);
          }
        }
        innerl.push({
          input: innerelement.input,
          val: li,
          id: innerelement._id,
          type: innerelement.type,
          subheadings: innerelement.subheadings,
        });
      }
    }
    l.push(innerl);
  }
  return l;
};
