const actions = {
  PARSE_FILE(context, { file, type }) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onerror = (error) => console.log(error);

    if (type === 'viewer') {
      reader.onload = (event) => {
        const text = event.target.result.trim();
        try {
          const header = this._vm.lib.viewerParseHeader(text);
          header.pixels = new Uint8ClampedArray(this._vm.lib.viewerParsePixels(text));
          header.name = file.name;
          context.commit('ADD_FILE', {
            file: header,
            type: 'viewer',
          });
        } catch (errors) {
          context.commit('ADD_FILE_PARSE_ERRORS', {
            errors,
            type: 'viewer',
          });
        }
      };
    } else if (type === 'ass1') {
      reader.onload = (event) => {
        const text = event.target.result;
        try {
          const header = {
            name: file.name,
          };
          header.text = text;
          this._vm.lib.ass1ParseFile(text);
          context.commit('ADD_FILE', {
            file: header,
            type: 'ass1',
          });
        } catch (errors) {
          context.commit('ADD_FILE_PARSE_ERRORS', {
            errors,
            type: 'ass1',
          });
        }
      };
    }
  },
  ASS1_CONVERT_TO_ASCII(context, {
    lightChar, darkChar, threshold, imgWidth,
  }) {
    const { text } = context.state.ass1.file;
    try {
      const asciiValues = this._vm.lib.ass1ConvertToAsciiArt(text, lightChar, darkChar, threshold, imgWidth);
      const { asciiFileUrl } = context.state.ass1;
      const asciiData = new Blob([asciiValues], { type: 'text/plain' });

      if (asciiFileUrl !== null) {
        window.URL.revokeObjectURL(asciiFileUrl);
      }

      context.commit('ADD_ASCII_ART_FILE', window.URL.createObjectURL(asciiData));
    } catch (errors) {
      context.commit('ADD_FILE_PARSE_ERRORS', {
        errors,
        type: 'ass1',
      });
    }
  },
  ASS1_CONVERT_TO_CSV(context, { imgWidth }) {
    const { text } = context.state.ass1.file;
    try {
      const csvValues = this._vm.lib.ass1ConvertToCsv(text, imgWidth);
      const { csvFileUrl } = context.state.ass1;
      const csvData = new Blob([csvValues], { type: 'text/plain' });

      if (csvFileUrl !== null) {
        window.URL.revokeObjectURL(csvFileUrl);
      }

      context.commit('ADD_CSV_FILE', window.URL.createObjectURL(csvData));
    } catch (errors) {
      context.commit('ADD_FILE_PARSE_ERRORS', {
        errors,
        type: 'ass1',
      });
    }
  },
};

export default actions;
