//console.log('welcome to the JS in page ')

//alert('sdadasdas')
//document.getElementById('demo').style.margin = "100px auto";



const weatherForm = document.querySelector('form')
const searchInput = document.getElementById('searchInput')

weatherForm.addEventListener('submit',function (e) {
    e.preventDefault()

    console.log('Form submited')
    console.log(searchInput.value)




    fetch('/weather?address='+searchInput.value).then((response) => {
        response.json().then((data) => {
            if (data.error){
                document.getElementById('text01').innerHTML = data.error
                console.log(data.error)
                return
            }else{
                document.getElementById('text01').innerHTML = data.location
                document.getElementById('text02').innerHTML = data.forecast
                document.getElementById('text03').innerHTML = data.address

            }
        })
    })
   searchInput.value = ""
})
