/* eslint-disable class-methods-use-this */
class FileController {
	async store(req, res) {
		return res.json(req.file);
	}
}

export default new FileController();
