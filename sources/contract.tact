import "@stdlib/deploy";

message Add {
    amount: Int as uint32;
}

message Subtract {
    amount: Int as uint32;
}

contract SampleTactContract with Deployable {

    owner: Address;
    counter: Int as uint32;

    init(owner: Address) {
        self.owner = owner;
        self.counter = 10;
    }

    fun add(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        self.counter = (self.counter + v);
    }

    fun subtract(v: Int) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        self.counter = (self.counter - v);
    }

    receive(msg: Add) {
        self.add(msg.amount);
    }

    receive(msg: Subtract) {
        self.subtract(msg.amount);
    }

    receive("increment") {
        self.add(1);
        self.reply("incremented".asComment());
    }

    receive("decrement") {
        self.subtract(1);
        self.reply("decremented".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun pointer(): Int {
        return self.counter;
    }

}