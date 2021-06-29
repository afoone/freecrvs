import { getFirstDoseByPriorityGroups } from "../../../../services/dashboard";
export default async (req, res) => {
  const results = await getFirstDoseByPriorityGroups();

  const rangos = [
    'Health personnel',
    'Teachers',
    'Workers at hotels, restaurants and bars',
    'Older people age 65 and above',
    'Security forces',
    'Community workers',
    'Comorbidity',
    'Other',
  ];

  const totals = results.reduce((acc, curr) => {

    const groups = curr._id

    console.log("groups", groups)
    // .map((i)=>{

    //     console.log("chau", i.value)

        // switch (true) {
        //   case i.value == rangos[0]:
        //     groups = {key:i.value,}
        //     break;
        //     case i.value == rangos[1]:

        //     break;
        //     case i.value == rangos[2]:

        //     break;
        //     case i.value == rangos[3]:

        //     break;
        //     case i.value == rangos[4]:
    
        //     break;
        //     case i.value == rangos[5]:

        //     break;
        //     case i.value == rangos[6]:
      
        //     break;
        //   default:
        //   //  ver el [7]
        //     break;
        // }      
    // })

      // console.log("valuee****", curr._id)

      
  }, {});
  res.json(totals);
};

