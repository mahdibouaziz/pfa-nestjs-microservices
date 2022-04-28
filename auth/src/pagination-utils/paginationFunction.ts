// search criteria must be in the form of the attributes of the entity

export const paginationFuntion = async (
  pagesToSkip = 0,
  limitOfDocuments = 15,
  filter = '',
  searchCriteria = [],
  model,
) => {
  // this must returns: data, totalItems, totalPages
  pagesToSkip = pagesToSkip * limitOfDocuments;
  let query = {};
  filter = filter.toLowerCase().trim();
  if (filter.length > 0) {
    query = {
      $or: searchCriteria.map((element) => {
        const obj = {};
        obj[element] = { $regex: filter, $options: 'i' };
        return obj;
      }),
    };
  }

  const data = await model
    .find(query)
    .sort({ _id: 1 })
    .skip(pagesToSkip)
    .limit(limitOfDocuments);

  const totalItems = await model.count(query);
  const totalPages = Math.floor(totalItems / limitOfDocuments) + 1;

  return {
    data,
    totalItems,
    totalPages,
  };
};
