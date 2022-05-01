// search criteria must be in the form of the attributes of the entity

// the doctor query will match the doctor it it exists
export const paginationFuntion = async (
  pagesToSkip = 0,
  limitOfDocuments = 15,
  filter = '',
  searchCriteria = [],
  model,
  doctorQuery = {},
  populate = '',
) => {
  // this must returns: data, totalItems, totalPages
  pagesToSkip = pagesToSkip * limitOfDocuments;
  let query = {
    ...doctorQuery,
  };
  filter = filter.toLowerCase().trim();
  if (filter.length > 0) {
    query = {
      $and: [
        {
          $or: searchCriteria.map((element) => {
            const obj = {};
            obj[element] = { $regex: filter, $options: 'i' };
            return obj;
          }),
        },
        { $or: [doctorQuery] },
      ],
    };
  }

  const data = await model
    .find(query)
    .populate(populate)
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
