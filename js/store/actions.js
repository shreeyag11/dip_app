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
          header.values = this._vm.lib.ass1ConvertToCsv(text);
          let csvFile;
          const data = new Blob([header.values], { type: 'text/plain' });

          // If we are replacing a previously generated file we need to
          // manually revoke the object URL to avoid memory leaks.
          if (csvFile !== null) {
            window.URL.revokeObjectURL(csvFile);
          }

          csvFile = window.URL.createObjectURL(data);
          context.commit('ADD_CSV_FILE', csvFile);
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
};

export default actions;