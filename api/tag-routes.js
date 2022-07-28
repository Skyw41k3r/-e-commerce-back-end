const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../models');

router.get('/', async (req, res) => {
  const allTags = await Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
  }).catch((err) => {
    res.json(err);
  });
  res.json(allTags);
});

router.get('/:id', async (req, res) => {
  const tagById = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
  }).catch((err) => {
    res.json(err);
  });
  res.json(tagById);
});
router.post('/', async (req, res) => {
  const newTag = await Tag.create(
    {
      tag_name: req.body.tag_name,
    }
  ).catch((err) => {
    res.json(err);
  });
  res.json(newTag);
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedTag) => {
    res.json(updatedTag);
  }).catch((err) => res.json(err)); 
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    },
  }).then((deletedTag) => {
    res.json(deletedTag);
  }).catch((err) => res.json(err));
});

module.exports = router;