// Assuming you have already created and exported the 'pool' object from your database connection module.

const GetDataService = async () => {
    try {
      const query = 'SELECT * FROM des54556 LIMIT 50';
  
      const results = await global.pool.query(query);
      const data = results.rows;
  
      console.log('data ', data.length)
      return {
        success: data.length > 0,
        message: data.length > 0 ? 'Users found successfully' : 'Cannot find users',
        data: data.length > 0 ? data : [],
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Error retrieving data.'); // Throw an error to be caught by the caller.
    }
  };
  
  module.exports = {
    GetDataService,
  };
  