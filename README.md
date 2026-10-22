
## Question 1: Top Students

```javascript
const students = [
  { name: "Sam",  group: "A", scores: [80, 92, 75] },
  { name: "Eve",  group: "B", scores: [95, 88, 91] },
  { name: "Mia",  group: "A", scores: [90, 85, 95] },
  { name: "Leo",  group: "B", scores: [60, 70, 65] },
  { name: "Noah", group: "A", scores: [82, 78, 85] },
  { name: "Ava",  group: "B", scores: [98, 96, 94] }
];

const getTopStudents=(students,group)=>{
    return students.filter((i)=>i.group===group)
    .map((i)=>{
        return{
            name:i.name,
            avg:(i.scores.reduce((acc,vale)=>acc+vale)/i.scores.length).toFixed(2),
        }
    })
    .filter((i)=>i.avg>=80).sort((a,b)=>b.avg-a.avg).map((i)=>`${i.name}:${i.avg}`);
}
console.log(getTopStudents(students, "A"));
console.log(getTopStudents(students, "B"));
```

## Question 2: Sales Summary by Category

```javascript
const sales = [ 
  { item: "Laptop", category: "Electronics", amount: 50000 }, 
  { item: "Phone", category: "Electronics", amount: 20000 }, 
  { item: "Chair", category: "Furniture", amount: 5000 }, 
  { item: "Desk", category: "Furniture", amount: 10000 }, 
  { item: "Tablet", category: "Electronics", amount: 15000 } 
];

const r = sales.reduce((acc, value) => {

  if (!acc[value.category]) {
    acc[value.category] = { total: 0,count:0};
  }
  acc[value.category]["total"]+= value.amount;
   acc[value.category]["count"]++;
  
  return acc;
}, {});

console.log(r);
```

## Question 3: Customer E-commerce Report

```javascript
const orders = [
  { id: 1, customer: "Nihal", category: "Electronics", amount: 5000, status: "completed" },
  { id: 2, customer: "Ravi",  category: "Furniture",   amount: 3000, status: "completed" },
  { id: 3, customer: "Nihal", category: "Electronics", amount: 2000, status: "completed" },
  { id: 4, customer: "Priya", category: "Fashion",     amount: 1500, status: "cancelled" },
  { id: 5, customer: "Ravi",  category: "Electronics", amount: 7000, status: "completed" },
  { id: 6, customer: "Nihal", category: "Fashion",     amount: 2500, status: "completed" },
  { id: 7, customer: "Priya", category: "Furniture",  amount: 4000, status: "completed" },
  { id: 8, customer: "Ravi",  category: "Fashion",     amount: 1000, status: "completed" },
  { id: 9, customer: "Priya", category: "Electronics", amount: 6000, status: "cancelled" },
  { id: 10, customer: "Nihal", category: "Furniture",  amount: 4500, status: "completed" }
];

function getCustomerReport(orders) {
  const ans=orders.filter(i => i.status !== "cancelled")
    .reduce((acc, value) => {
      if (!acc[value.customer]) {
        acc[value.customer] = {
          customer: value.customer,
          totalSpent: 0,
          totalOrders: 0,
          categories: []
        };
      }

      acc[value.customer].totalOrders++;
      acc[value.customer].totalSpent += value.amount;
      acc[value.customer].categories.push(value.category);

      return acc;
    }, {})
    Object.values(ans).map(customer => ({
      ...customer,
      categories: [...new Set(customer.categories)],
      averageOrder: customer.totalSpent / customer.totalOrders
    }))
    .filter(customer => customer.totalSpent >= 7000)
    .sort((a, b) => b.totalSpent - a.totalSpent);
    return ans;
}

console.log(getCustomerReport(orders));
```

## Question 4: Price Parsing and Average

```javascript
const prices = ["120.50", "80.25", "invalid", "45.75", "100"];

const ans=prices.map(i=>parseFloat(i))
  .filter(i=>!isNaN(i))
  .reduce((acu,value)=>acu+value);

console.log((ans/prices.length).toFixed(2));
```

## Question 5: Product Availability

```javascript
return products.filter(i=>i.stock>0 && i.price>1000)
  .sort((a,b)=>b-a)
  .map(i=>`${i.name} - ₹${i.price}`);
```

## Question 6: Group Employees by Department

```javascript
const r=employees.reduce((acc,value)=>{
  if(!acc[value.department]){
    acc[value.department]=[];
  }
  acc[value.department].push(value.name);
  return acc;
},{});
```

## Question 7: Using some(), every(), and find()

```javascript
const ans={
  hasMinor: users.some(num=>num.age<18),
  allActive:users.every(num=>num.active===true),
  firstEligibleUser:users.find(nums=>nums.age>18)
}
```

## Question 8: Number Transformation

```javascript
const values = [12.78, -12.78, 4.5, 4.4, 9.999];
const ans=values.map((i)=>{
    return {
        original:i,
        truncated:Math.trunc(i),
        rounded:Math.round(i),
        fixedTwoDecimals:i.toFixed(2).toString()
    }
});
console.log(ans);
```

## Question 9: Customer Tier Labels

```javascript
const purchases = [
  { customer: "Asha", amount: 1200 },
  { customer: "Ravi", amount: 8000 },
  { customer: "Asha", amount: 2500 },
  { customer: "Mina", amount: 6000 },
  { customer: "Ravi", amount: 4000 },
  { customer: "Mina", amount: 500 }
];

const ans=purchases.reduce((acc,value)=>{
    if (!acc[value.customer]) { 
        acc[value.customer] = {
        customer: value.customer, 
        TotalSpent: 0, 
        purchaseCount: 0 
        }; 
    } 
    acc[value.customer].TotalSpent+=value.amount;
    acc[value.customer].purchaseCount++;
    return acc;
},{});
const ans1=Object.values(ans).map((i)=>{
    let tier;
    if(i.TotalSpent>=10000){
        tier="gold";
    }
    else if(i.TotalSpent>=5000 && i.TotalSpent<10000){
        tier="silver"
    }
    else{
        tier="Bronze"
    }
    return{
        ...i,
        tier:tier,
    }
}).sort((a,b)=>b.TotalSpent-a.TotalSpent);
console.log(ans1);
