function toMCSPosition(section, wcsPosition) {
  var partAttachPoint = section.getPartAttachPoint();
  var tableAttachPoint = machineConfiguration.getTableAttachPoint();
  var mcsPosition = Vector.sum(
    tableAttachPoint,
    Vector.diff(wcsPosition, partAttachPoint)
  );
  return mcsPosition;
}

function verifyWCS() {
  if (machineConfiguration.isReceived()) {
    var checked = [];
    writeComment("-----------------------");
    writeComment("   Verify WCS Positions");
    for (i = 0; i < getNumberOfSections(); ++i) {
      var section = getSection(i);
      var wcs = section.workOffset;
      wcs = wcs == 0 ? 1 : wcs;
      wcs = wcs > 6 ? -(wcs - 6) : wcs + 53;
      if (typeof checked[wcs] == "undefined") {
        mcsOrigin = toMCSPosition(section, new Vector(0, 0, 0));
        writeBlock(
          gFormat.format(65),
          "P" + 8901,
          "X" + xyzFormat.format(mcsOrigin.x + properties.wcsXShift),
          "Y" + xyzFormat.format(mcsOrigin.y + properties.wcsYShift),
          "Z" + xyzFormat.format(mcsOrigin.z + properties.wcsZShift),
          "E" + xyzFormat.format(properties.wcsTolerance),
          "W" + wcs
        );
        checked[wcs] = true;
      }
    }
    writeComment("-----------------------");
    writeln("");
  }
}


// In the onOpen function call the verifyWCS() method. 