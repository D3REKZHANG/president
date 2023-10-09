import express from 'express';

const home = (req, res) => {
  res.status(200).json({a:"yert"});
}

export { home }
