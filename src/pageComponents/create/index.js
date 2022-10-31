import { useState, Suspense } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import dynamic from 'next/dynamic';
import { useLoader, Canvas } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// local imports
import InputField from 'pageComponents/common/InputField'
import { Grid } from 'node_modules/@material-ui/core/index';

const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls, {
	ssr: false,
}));

const styles = theme => ({
	rowSuccess: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: theme.core.colors.lighterGreen,
		marginBottom: '20px',
		padding: '15px 15px 15px 15px',
		'border-radius': '5px',
	},
	labelGrid: {
		display: 'flex',
	},
	successText: {
		color: theme.core.colors.black,
		fontSize: theme.core.sizes.sm,
		fontWeight: 600,
		padding: '0px 10px 0px 0px',
		letterSpacing: '0.12px',
	},
	buttonSec: {
		marginRight: 5,
		textAlign: 'right',
	},
	blackButton: {
		color: theme.core.colors.white,
		borderRadius: '2px',
		padding: '8px 18px',
		backgroundColor: theme.core.colors.black,
	},
	greyButton: {
		marginRight: 15,
		padding: '8px 15px',
	},
	iconClass: {
		color: theme.core.colors.darkGreen,
		alignSelf: 'center',
		margin: '0px 15px 0px 0px',
	},
	previewWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '400px',
		height: '400px',
		boxShadow: '0px 3px 6px rgba(51, 51, 79, 0.1)',
		borderRadius: 8
	},
	formInput: {
		marginTop: 30
	},
	mintWrapper: {
		margin: 'auto',
		width: '70%',
		height: '500px',
		justifyContent: 'space-between',
	}
})

const Box = () => {
	return (
		<mesh>
			<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
			<meshStandardMaterial attach="material" transparent opacity={0.5} />
		</mesh>
	)
}

const MintWrapper = (props) => {
	const { classes, t } = props;
	const [name, setName] = useState('');
	const [fileUri, setFileUri] = useState('');

	const handleFileChange = (event) => {
		const fileList = event.target.files;

		if (!fileList) {
			return;
		}

		const file = fileList[0];

		if (!file) {
			return;
		}
		const reader = new FileReader();

		reader.addEventListener("load", () => {
			// convert image file to base64 string
			setFileUri(reader.result);
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const uploadModelToIPFS = async () => {
		return 'uploaded ipfs uri';
	}

	const uploadMetadataToIPNS = async (tokenId, metadata) => {
		return 'uploaded ipns uri';
	}

	const handleMint = async () => {
		const assetUri = await uploadModelToIPFS();
		const metadata = {
			name: name,
			thumbnail: '',
			asset: assetUri
		};
		console.log({ metadata })

		/// get latest tokenId
		const tokenId = 1;

		await uploadMetadataToIPNS(tokenId, JSON.stringify(metadata));

		/// call mint function TO_DO
	}

	return (
		<>
			<Grid container direction="row" alignItems="flex-start" className={classes.mintWrapper}>
				<Grid item>
					<Grid container direction="column">
						<Grid item className={classes.formInput}>
							<label htmlFor='name'>Name</label>
							<InputField
								id="name"
								name='name'
								type="text"
								className="input-box"
								onChange={setName}
							/>
						</Grid>
						<Grid item className={classes.formInput}>
							<label htmlFor='file'>Asset</label>
							<InputField
								id="file"
								name='file'
								type="file"
								onChange={handleFileChange}
								className="input-box"
							/>
						</Grid>
						<Grid item className={classes.formInput}>
							<Button
								data-tc="confirm-btn"
								onClick={handleMint}
								variant="contained"
								className={classes.blackButton}>
								Confirm
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction="column" style={{ width: 400, height: 500 }}>
						<h3>Preview</h3>
						<Grid item className={classes.previewWrapper}>
							{fileUri !== '' ? (
								<Canvas camera={{ position: [0, 0, 10] }}>
									<ambientLight intensity={0.5} />
									<spotLight intensity={0.8} position={[300, 300, 400]} />
									<OrbitControls autoRotate={false} />
									<Suspense fallback={<Box />}>
										<ModelViewer fileUrl={fileUri} />
									</Suspense>
								</Canvas>
							) : (
								<p>Please upload 3d file to view</p>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

const ModelViewer = ({ fileUrl }) => {
	const gltf = useLoader(GLTFLoader, fileUrl)
	return <primitive object={gltf.scene} position={[0, 0, 0]} />
}

export default withStyles(styles)(MintWrapper);
