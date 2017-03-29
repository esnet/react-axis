import renderer from "react-test-renderer";
import React from "react";
import Tick from "../../test_components/Tick";

//
// Ticks at the bottom of a chart (Bottom aligned)
//

test('Basic Tick with label 1.2', () => {
  const tree = renderer.create(
        <Tick test={0}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tick with position changed to 50px across', () => {
  const tree = renderer.create(
        <Tick test={1}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tick with label aligned to center of mark', () => {
  const tree = renderer.create(
        <Tick test={2}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('A Tick with a longer mark size', () => {
  const tree = renderer.create(
        <Tick test={3}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('A Tick with a longer mark size and adjacent alignment', () => {
  const tree = renderer.create(
        <Tick test={3}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

//
// Ticks at the top of a chart (Top aligned)
//

test('Top aligned Tick with label 1.2', () => {
  const tree = renderer.create(
        <Tick test={0}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Top aligned Tick with position changed to 50px across', () => {
  const tree = renderer.create(
        <Tick test={1}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Top aligned Tick with label aligned to center of mark', () => {
  const tree = renderer.create(
        <Tick test={2}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Top aligned A Tick with a longer mark size', () => {
  const tree = renderer.create(
        <Tick test={3}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Top aligned A Tick with a longer mark size and adjacent alignment', () => {
  const tree = renderer.create(
        <Tick test={3}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
