import "./App.css";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { ABI, ADDRESS } from "./config";

const App = () => {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [count, setCount] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [listABI, setListABI] = useState({});

  useEffect(() => {
    loadBlockChain();
  }, []);

  const loadBlockChain = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const account =
      (await web3.eth.getAccounts()) && (await web3.eth.requestAccounts());

    setAccount(account[0]);

    const balance = await web3.eth.getBalance(account[0]);
    setBalance(balance);

    console.log(account);

    const getListABI = new web3.eth.Contract(ABI, ADDRESS);
    setListABI(getListABI);

    console.log(getListABI);
    // console.log("getList", getListABI);

    const taskCount = await getListABI.methods.taskCount().call();
    setCount(taskCount);

    for (var i = 1; i <= taskCount; i++) {
      // call the contacts method to get that particular contact from smart contract
      const contact = await getListABI.methods.tasks(i).call();
      setContacts((contacts) => [...contacts, contact]);
      setLoading(false);

      console.log("contact", contact);

      // add recently fetched contact to state variable.
    }

    // console.log("cccc", taskCount);
    // for(i = 0; i<= taskCount.length; i++) {
    //   const task = await getListABI.methods.task(i).call()

    // }
  };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   console.log("name: " + name, " + content: " + content);
  //   console.log("getLi123213213st", listABI);
  // };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const createTask = (listABI, name, content, account) => {
    setLoading(true);
    console.log("listABI,", listABI);
    listABI.methods
      .createTask(name, content)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        setLoading(false);
        window.location.reload();
      });
  };

  return (
    <div className="container">
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div className="header">
          <h1>Welcome to MetaMask!!!</h1>
          <h3>Your Account: </h3> {account}
          <h3>Task Count: {count}</h3>
          <h3>Balance: {balance}</h3>
          <h3>Name: </h3>
          <h1>Contracts</h1>
          <ul>
            <div className="input">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createTask(listABI, name, content, account);
                }}
              >
                <input
                  type="text"
                  onChange={handleName}
                  value={name}
                  placeholder="Name..."
                />
                <input
                  type="text"
                  onChange={handleContent}
                  value={content}
                  placeholder="Content..."
                />
                {/* <button onClick={() => {createTask(listABI, name, content, account)}}>Confirm!</button> */}
              </form>
            </div>

            {contacts.map((contact, index) => (
              <div className="content" key={index}>
                <span>
                  {" "}
                  <input type="checkbox" />{index + 1}. Name : {contact.getname}
                </span>
                <p>Content: {contact.content}</p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
