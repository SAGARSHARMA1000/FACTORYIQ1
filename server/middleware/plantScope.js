/**
 * Plant isolation helper.
 *
 * WHERE TO ADD: new file, drop it in server/middleware/.
 * WHERE TO USE IT: after requireAuth on any route that reads or writes plant data:
 *   router.get('/', requireAuth, plantScope, getDocuments);
 *
 * Then in the controller, spread the filter into every query:
 *   Document.find({ ...req.plantFilter })
 *   Document.create({ ...body, plantId: req.user.plantId })
 *
 * This only works once Document, Chunk and QueryLog have a `plantId` field
 * (see INTEGRATION.md, "Plant isolation"). Until then, skip this file.
 */
module.exports = function plantScope(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Not signed in' });
  req.plantFilter = { plantId: req.user.plantId };
  return next();
};
