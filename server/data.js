// Giả sử chúng ta sẽ match 3 bạn đầu tiên có GPA không hơn kém nhau quá 0.2 (de sau)
// Ví dụ có 10 bạn như sau:
// Sau khi người dùng vào hàng chờ, server sẽ tìm kiếm 5 người đầu tiên đạt điều kiện để join 1 phòng
// Trường hợp 1: join 3 người đầu tiên có cùng GPA với nhau

export let users = [
    {
        _id: 1,
        name: "user 1",
        gpa: 5.0
    }, {
        _id: 2,
        name: "user 2",
        gpa: 4.9
    }, {
        _id: 3,
        name: "user 3",
        gpa: 4.9
    }, {
        _id: 4,
        name: "user 4",
        gpa: 4.9
    }, {
        _id: 5,
        name: "user 5",
        gpa: 4.6
    }, {
        _id: 6,
        name: "user 6",
        gpa: 4.5
    }, {
        _id: 7,
        name: "user 7",
        gpa: 4.4
    }, {
        _id: 8,
        name: "user 8",
        gpa: 4.3
    }, {
        _id: 9,
        name: "user 9",
        gpa: 4.2
    }, {
        _id: 10,
        name: "user 10",
        gpa: 4.1
    }
]

export let queue = []
