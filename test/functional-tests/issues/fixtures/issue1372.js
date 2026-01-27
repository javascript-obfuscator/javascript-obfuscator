function test(hasColor)
{
  const accent = hasColor ? "primary" : undefined;
  const theme = { palette: { primary: { main: "ok" } }};

  const obj =
  {
    bgcolor: "test",
    ...(accent && { color: theme.palette[accent].main })
  }

  return obj;
}

module.exports = { test };
