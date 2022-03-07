const strengthMeter = document.getElementById('strength-meter');
const passwordInput = document.getElementById('password-input');
const reasonsContainer = document.getElementById('reasons');


passwordInput.addEventListener('input', calcStrength)

calcStrength();

function calcStrength(){
    let str = 100;
    const weaknesses = weaknessCalculator(passwordInput.value)
    reasonsContainer.innerHTML="";
    weaknesses.forEach(weakness =>{
        if (weakness == null) return
        str -= weakness.deduction;
        const messageElement = document.createElement('div')
        messageElement.innerText = weakness.message
        reasonsContainer.appendChild(messageElement)

    })
 
    
document.getElementById("demo").innerHTML = str * 1  + '%';
strengthMeter.style.setProperty('--strength', str)

}

function weaknessCalculator (password){
    const weakness = [];
    weakness.push(lengthCalculate(password));
    weakness.push(lowerCase(password));
    weakness.push(upperCase(password));
    weakness.push(digit(password));
    weakness.push(specialChar(password));
    weakness.push(repratChar(password));
    return weakness;

}

function lengthCalculate(password)
{
    if (password.length <= 5)
    {
        return {
            message : "Your password is to small",
            deduction : 40
        }
    }
    if (password.length <=10 )
    {
        return {
            message : "Your password could be longer",
            deduction : 10
        }
    }
}
function lowerCase (password)
{
    return charcase (password, /[a-z]/g, "Lower Case");
}
function upperCase (password)
{
    return charcase (password, /[A-Z]/g, "Upper Case");
}
function digit (password)
{
    return charcase (password, /[0-9]/g, "Numbers");
}
function specialChar (password)
{
    return charcase (password, /[^a-z A-Z\d]/g, "Special Characters");
}
function charcase(password, reges, type)
{
    const match = password.match(reges) || []
    if (match.length === 0)
    {
        return {
            message :`No ${type} characters`,
            deduction: 25
        }
    }
    if (match.length <= 2)
    {
        return {
            message :`should have more ${type} characters`,
            deduction: 5
        }
    }
}
function repratChar (password)
{
    const match = password.match(/(.)\1/g) || []
    if (match.length < 0 )
    {
        return{
            message: "Better not to repeat characters",
            deduction : 10
        }
    }
}

