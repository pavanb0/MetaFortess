const postData = [


    {
      username: 'alex_johnson',
      email: 'alexjohnson@example.com',
      password: 'securepassword789'
    },
    {
      username: 'emily_williams',
      email: 'emilywilliams@example.com',
      password: 'pass123'
    },
    {
      username: 'michael_brown',
      email: 'michaelbrown@example.com',
      password: 'mypass456'
    },
    // Add more objects as needed...
    {
      username: 'sarah_jones',
      email: 'sarahjones@example.com',
      password: 'pass123'
    },
    {
      username: 'david_smith',
      email: 'davidsmith@example.com',
      password: 'mypass456'
    },
    {
      username: 'emma_thompson',
      email: 'emmathomson@example.com',
      password: 'secure123'
    },
    {
      username: 'jason_davis',
      email: 'jasondavis@example.com',
      password: 'pass123'
    },
    {
      username: 'natalie_clark',
      email: 'natalieclark@example.com',
      password: 'mypass456'
    }
   
  ];
  count = 0;
  async function post() {
  await fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData[count++])
  })
    .then(response => {
      if (response.ok) {
        console.log('Data inserted successfully');
      } else {
        throw new Error('Failed to insert data');
      }
    })
    .catch(error => {
        if(count > postData.length){
            return;
        }
        else if(error.message.includes('UNIQUE constraint failed')){
            console.log('Username already exists');
            count++;
            post();
        }
      console.error(error);
    });
}
setInterval(async ()=>{
    await post();
}, 50);