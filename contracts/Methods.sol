pragma solidity ^0.8.11;

contract Methods {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string getname;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;
    

    event TaskCreated(
        uint id,
        string getname,
        string content,
        bool completed
        );

    // event TaskCompleted(
    //     uint id,
    //     bool completed
    // );

    constructor() {
        createTask("Trungggggg","This is test - 1234!!!!");
    }

    function createTask(string memory _getname,string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _getname, _content, false);
        emit TaskCreated(taskCount, _getname, _content, false);
    }

    // function toggleCompleted(uint _id) public{
    //     Task memory _task = tasks[_id];
    //     _task.completed = !_task.completed;
    //     tasks[_id] = _task;
    //     emit TaskCompleted(_id, _task.completed);
    // }
}
