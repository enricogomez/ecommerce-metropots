const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);


class UsersRepository extends Repository {
  
  async create(attrs) {
    attrs.id = this.randomId();
    const salt = crypto.randomBytes(8).toString('hex');
    const buff = await scrypt(attrs.password, salt, 64);
    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buff.toString('hex')}.${salt}` 
    }; 
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePasswords(saved, supplied) { //Saved === Password in database(hashed w/ salt + salt) 
    const [ hashed, salt ] = saved.split('.');
    const hashedSuppliedBuff = await scrypt(supplied, salt, 64);
    const hashedSupplied = hashedSuppliedBuff.toString('hex');

    return hashed === hashedSupplied;
  }

}
  
module.exports = new UsersRepository('users.json'); 





// const test = async () => {
// const repo = new UsersRepository('users.json');
// const user = await repo.getOneBy({ username: "ENRICOGOMEX", nickname: "amil"});
// // await repo.create(
// //   {
// //     username: 'Enrico',
// //     password: '2eweqawdas'
// //   }
// // );
// //const users = await repo.getAll();
// console.log(user); 
// }; 

// test();