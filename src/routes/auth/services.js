// Assuming you have already created and exported the 'pool' object from your database connection module.

const GetDataService = async (reqQuery) => {
    console.log('zee ', reqQuery)
    try {
      const query = `SELECT * FROM ${reqQuery.ref} LIMIT 50`;
  
      const results = await global.pool.query(query);
      const data = results.rows;
  
      console.log('data ', data.length)
      return {
        success: data.length > 0,
        message: data.length > 0 ? 'Users found successfully' : 'Cannot find users',
        data: data.length > 0 ? data : [],
      };
    } catch (error) {
      throw new Error('Unable to find data'); // Throw an error to be caught by the caller.
    }
  };
  
  module.exports = {
    GetDataService,
  };
  